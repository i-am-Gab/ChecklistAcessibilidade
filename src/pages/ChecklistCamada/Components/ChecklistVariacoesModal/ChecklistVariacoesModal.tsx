import { useId, useState } from "react";
import { useModalDialog } from "../../../../hooks/useModalDialog";
import styles from "./ChecklistVariacoesModal.module.css";

type Option = { label: string; description: string };
type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  options: Option[];
  selectedOption: string;
  onSelect: (value: string) => void;
  onClose: () => void;
  describeChange: (value: string) => string;
};

export default function ChecklistVariacoesModal(props: Props) {
  const dialogRef = useModalDialog(props.isOpen);
  const id = useId();
  return (
    <dialog ref={dialogRef} className={styles.modal} aria-labelledby={`${id}-titulo`} aria-describedby={`${id}-descricao`} onCancel={(event) => { event.preventDefault(); props.onClose(); }}>
      <h2 id={`${id}-titulo`} className={styles.title}>{props.title}</h2>
      <p id={`${id}-descricao`} className={styles.description}>{props.description}</p>
      {props.isOpen && <VariationForm {...props} />}
    </dialog>
  );
}

function VariationForm({ options, selectedOption, onSelect, onClose, describeChange }: Props) {
  const [pending, setPending] = useState(selectedOption);
  const id = useId();
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSelect(pending); onClose(); }}>
      <fieldset className={styles.optionsList} aria-describedby={`${id}-consequencias`}>
        <legend className="sr-only">Variações disponíveis</legend>
        {options.map((option, index) => (
          <label key={option.label} className={`${styles.optionButton} ${pending === option.label ? styles.optionButtonSelected : styles.optionButtonDefault}`}>
            <span className={styles.optionContent}>
              <input type="radio" name={`${id}-variacao`} value={option.label} checked={pending === option.label} onChange={() => setPending(option.label)} aria-labelledby={`${id}-nome-${index}`} aria-describedby={`${id}-descricao-${index}`} />
              <span className={styles.optionText}>
                <span id={`${id}-nome-${index}`} className={styles.optionTitle}>{option.label}</span>
                <span id={`${id}-descricao-${index}`} className={styles.optionDescription}>{option.description}</span>
              </span>
            </span>
          </label>
        ))}
      </fieldset>
      <p id={`${id}-consequencias`} role="status" aria-atomic="true">{describeChange(pending)}</p>
      <div className={styles.actions}>
        <button type="button" onClick={onClose} className={styles.closeButton}>Fechar</button>
        <button type="submit" className={styles.applyButton}>Aplicar variação</button>
      </div>
    </form>
  );
}
