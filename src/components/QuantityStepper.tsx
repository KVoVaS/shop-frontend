export function QuantityStepper(props: {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="stepper">
      <button className="btn btn--ghost" onClick={props.onDecrement} aria-label="Уменьшить">−</button>
      <span data-testid="quantity">{props.value}</span>
      <button className="btn btn--ghost" onClick={props.onIncrement} aria-label="Увеличить">+</button>
    </div>
  );
}