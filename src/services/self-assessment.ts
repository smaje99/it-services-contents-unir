import { z } from 'zod';

import type { SelfAssessment } from '@/types/self-assessment';

export const SELF_ASSESSMENT_PARAMETER = 'self-assessment';

/** Checks if the self-assessment should be automatically opened based on the URL
 * search parameters.
 */
export function shouldAutoOpenSelfAssessment(search: string): boolean {
  const params = new URLSearchParams(search);
  return params.get(SELF_ASSESSMENT_PARAMETER) === '1';
}

export function clearSelfAssessmentParam(): void {
  const url = new URL(window.location.href);
  url.searchParams.delete(SELF_ASSESSMENT_PARAMETER);
  window.history.replaceState({}, '', url.toString());
}

/** Builds a Zod schema for validating self-assessment answers. */
export function buildSelfAssessmentSchema(assessment: SelfAssessment) {
  return z
    .object({
      answers: z
        .array(z.coerce.number().int())
        .length(assessment.questions.length, 'Responde todas las preguntas.'),
    })
    .superRefine((val, ctx) => {
      assessment.questions.forEach((q, i) => {
        const a = val.answers[i];
        if (Number.isNaN(a)) {
          ctx.addIssue({
            code: 'custom',
            path: ['answers', i],
            message: 'Selecciona una opción.',
          });
          return;
        }
        if (a < 0 || a >= q.options.length) {
          ctx.addIssue({
            code: 'custom',
            path: ['answers', i],
            message: 'Opción inválida.',
          });
        }
      });
    });
}

export type SelfAssessmentFormValues = z.infer<
  ReturnType<typeof buildSelfAssessmentSchema>
>;

/** Scores the self-assessment based on the provided answers. */
export function scoreSelfAssessment(assessment: SelfAssessment, answers: number[]) {
  let correct = 0;

  const details = assessment.questions.map((question, idx) => {
    const chosen = answers[idx];
    const isCorrect = chosen === question.answerIndex;

    if (isCorrect) {
      correct += 1;
    }

    return {
      questionId: question.id,
      chosenIndex: chosen,
      correctIndex: question.answerIndex,
      isCorrect,
      explanation: question.explanation ?? '',
    };
  });

  const total = assessment.questions.length;
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);

  return { correct, total, percent, details };
}
