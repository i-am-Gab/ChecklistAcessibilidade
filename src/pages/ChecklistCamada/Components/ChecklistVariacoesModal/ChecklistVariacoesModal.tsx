import styles from "./ChecklistVariacoesModal.module.css";

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
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>

        <p className={styles.description}>{description}</p>

        <div className={styles.optionsList}>
          {options.map((option) => {
            const isSelected = selectedOption === option.label;

            return (
              <button
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
          onClick={onClose}
          className={styles.closeButton}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}