export function Input({ onChange, placeholder }: { placeholder:string; onChange?: () => void }) {
    return (
      <div >
        <input
          placeholder={placeholder}
          type={"text"}
          className="px-4 py-2 border-green-200 border-2 rounded bg-green-400 text-white"
          onChange={onChange}
        ></input>
      </div>
    );
  }