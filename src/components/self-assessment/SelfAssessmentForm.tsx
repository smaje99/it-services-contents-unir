import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  buildSelfAssessmentSchema,
  clearSelfAssessmentParam,
  scoreSelfAssessment,
  type SelfAssessmentFormValues,
  shouldAutoOpenSelfAssessment,
} from '@/services/self-assessment';
import type { SelfAssessment } from '@/types/self-assessment';

import styles from './SelfAssessmentForm.module.css';

type Props = {
  dialogId: string;
  assessment: SelfAssessment;
};

export function SelfAssessmentForm({ dialogId, assessment }: Props) {
  const schema = useMemo(() => buildSelfAssessmentSchema(assessment), [assessment]);

  /** Default form values with all answers initialized to NaN */
  const defaultValues: SelfAssessmentFormValues = useMemo(
    () => ({
      answers: Array.from({ length: assessment.questions.length }, () => Number.NaN),
    }),
    [assessment.questions.length],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SelfAssessmentFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit',
  });

  const [result, setResult] = useState<ReturnType<typeof scoreSelfAssessment> | null>(
    null,
  );

  // Auto-open by query param
  useEffect(() => {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    if (!dialog) {
      return;
    }

    if (shouldAutoOpenSelfAssessment(window.location.search) && !dialog.open) {
      dialog.showModal();
    }

    const onClose = () => {
      // limpiar param al cerrar
      clearSelfAssessmentParam();
      setResult(null);
      reset(defaultValues);
    };

    dialog.addEventListener('close', onClose);

    // Cleanup listener on unmount
    return () => dialog.removeEventListener('close', onClose);
  }, [dialogId, reset, defaultValues]);

  const onSubmit = (values: SelfAssessmentFormValues) => {
    const scored = scoreSelfAssessment(assessment, values.answers);
    setResult(scored);
  };

  const closeDialog = () => {
    const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
    if (!dialog) {
      return;
    }

    clearSelfAssessmentParam();
    dialog.close();
  };

  const restart = () => {
    setResult(null);
    reset(defaultValues);
  };

  /** Watch for changes in answers */
  const answers = watch('answers');

  // Si ya hay resultado, no permitir cambios en las respuestas
  if (result) {
    return (
      <section className={styles['sa__result']}>
        <h4>Resultado</h4>
        <p>
          Obtuviste <strong>{result.correct}</strong> de <strong>{result.total}</strong> (
          <strong>{result.percent}%</strong>).
        </p>

        <div className={styles['sa__review']}>
          {assessment.questions.map((q, i) => {
            const chosen = result.details[i]?.chosenIndex;
            const correct = result.details[i]?.correctIndex;
            const ok = result.details[i]?.isCorrect;

            return (
              <div
                key={q.id}
                className={styles['sa__review-item']}
                data-state={ok ? 'ok' : 'bad'}
              >
                <p className={styles['sa__review-q']}>
                  <strong>{i + 1}.</strong> {q.prompt}
                </p>
                <p className={styles['sa__review-a']}>
                  Tu respuesta:{' '}
                  <strong>{Number.isFinite(chosen) ? q.options[chosen] : '—'}</strong>
                </p>
                {!ok ? (
                  <p className={styles['sa__review-a']}>
                    Correcta: <strong>{q.options[correct]}</strong>
                  </p>
                ) : null}
                {q.explanation ? (
                  <p className={styles['sa__explain']}>
                    <strong>Explicación:</strong> {q.explanation}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <footer className={styles['sa__footer']}>
          <button type='button' className={styles['sa__btn']} onClick={restart}>
            Reintentar
          </button>
          <button
            type='button'
            className={`${styles['sa__btn']} ${styles['sa__btn--primary']}`}
            onClick={closeDialog}
          >
            Cerrar
          </button>
        </footer>
      </section>
    );
  }

  // Formulario de evaluación
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sa__form']}>
      {assessment.questions.map((q, qIdx) => (
        <fieldset key={q.id} className={styles['sa__card']}>
          <legend className={styles['sa__prompt']}>
            <span className={styles['sa__qindex']}>
              Pregunta {qIdx + 1} de {assessment.questions.length}
            </span>
            {q.prompt}
          </legend>

          <div className={styles['sa__options']}>
            {q.options.map((opt, oIdx) => (
              <label key={oIdx} className={styles['sa__option']}>
                <input
                  type='radio'
                  value={oIdx}
                  {...register(`answers.${qIdx}` as const)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>

          {errors.answers?.[qIdx] ? (
            <p className={styles['sa__error']}>{String(errors.answers[qIdx]?.message)}</p>
          ) : null}
        </fieldset>
      ))}

      {/* validación general (length) */}
      {typeof errors.answers?.message === 'string' ? (
        <p className={`${styles['sa__error']} ${styles['sa__error--global']}`}>
          {errors.answers.message}
        </p>
      ) : null}

      <footer className={styles['sa__footer']}>
        <button type='button' className={styles['sa__btn']} onClick={closeDialog}>
          Cancelar
        </button>
        <button
          type='submit'
          className={`${styles['sa__btn']} ${styles['sa__btn--primary']}`}
        >
          Finalizar
        </button>
      </footer>
    </form>
  );
}
