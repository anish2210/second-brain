interface InputProps {
  placeholder: string;
  reference?: any;
  type?: string;
}

export function Input({ placeholder, reference, type = "text" }: InputProps) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        ref={reference}
        className="px-4 py-2 border-green-200 border-2 rounded bg-green-400 text-white w-full"
      ></input>
    </div>
  );
}
