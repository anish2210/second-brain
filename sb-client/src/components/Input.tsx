interface InputProps {
  placeholder: string;
  reference?: any;
}

export function Input(props: InputProps) {
  return (
    <div>
      <input
        placeholder={props.placeholder}
        type={"text"}
        ref={props.reference}
        className="px-4 py-2 border-green-200 border-2 rounded bg-green-400 text-white"
      ></input>
    </div>
  );
}
