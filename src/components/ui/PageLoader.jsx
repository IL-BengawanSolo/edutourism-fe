import { SpinnerCircular } from "spinners-react";

export default function PageLoader({ message = "Loading..." }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <SpinnerCircular
        size={48}
        thickness={100}
        speed={100}
        color="#0163D2"
        secondaryColor="#e5e7eb"
      />
      <span className="mt-4 text-neutral-500">{message}</span>
      <span className="sr-only">{message}</span>
    </div>
  );
}
