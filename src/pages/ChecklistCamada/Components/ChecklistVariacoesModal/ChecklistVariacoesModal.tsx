import styles from "./ChecklistVariacoesModal.module.css";
import { useId } from "react";
import { useModalDialog } from "../../../../hooks/useModalDialog";

type Option = {
  label: string;
  description: string;
};

type ChecklistVariacoesModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  options: Option[];
  selectedOption: string;
  onSelect: (value: string) => void;
  onClose: () => void;
};

export default function ChecklistVariacoesModal({
  isOpen,
  title,
  description,
  options,
  selectedOption,
  onSelect,
  onClose,
}: ChecklistVariacoesModalProps) {
  const dialogRef = useModalDialog(isOpen);
  const titleId = useId();
  const descriptionId = useId();

  return (
    <dialog ref={dialogRef} className={styles.modal} aria-labelledby={titleId} aria-describedby={descriptionId} onCancel={(event) => { event.preventDefault(); onClose(); }}>
        <h2 id={titleId} className={styles.title}>{title}</h2>

        <p id={descriptionId} className={styles.description}>{description}</p>

        <div className={styles.optionsList}>
          {options.map((option) => {
            const isSelected = selectedOption === option.label;

            return (
              <button
                type="button"
                aria-pressed={isSelected}
                key={option.label}
                onClick={() => {
                  onSelect(option.label);
                  onClose();
                }}
                className={`${styles.optionButton} ${
                  isSelected
                    ? styles.optionButtonSelected
                    : styles.optionButtonDefault
                }`}
              >
                <div className={styles.optionContent}>
                  <div
                    className={`${styles.radioIndicator} ${
                      isSelected
                        ? styles.radioIndicatorSelected
                        : styles.radioIndicatorDefault
                    }`}
                  >
                    {isSelected && (
                      <div className={styles.radioIndicatorInner} />
                    )}
                  </div>

                  <div className={styles.optionText}>
                    <h3 className={styles.optionTitle}>
                      {option.label}
                    </h3>
                    <p className={styles.optionDescription}>
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
        >
          Fechar
        </button>
    </dialog>
  );
}
