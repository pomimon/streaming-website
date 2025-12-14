import styles from "./styles.module.css";

import { Container, Section } from "Components";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.outerContent}>
        <Section>
          <Container>
            <div className={styles.innerContent}>
              <button className={styles.close} onClick={onClose}>
                ×
              </button>

              {children}
            </div>
          </Container>
        </Section>
      </div>
    </div>
  );
}
