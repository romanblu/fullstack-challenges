
export default function EditorButton({
  icon: Icon,
  isActive = false,
  onClick,
  title = "",
  disabled = false
}) {

    return (
        <button
        type="button"
        onClick={onClick}
        title={title}
        className={ isActive ?
            "p-2 rounded bg-gray-300 text-green-600"
            :
            "p-2 rounded hover:bg-gray-200 transition"            
        }
        disabled={disabled}
        >
        {Icon ? <Icon size={18} /> : null}
        </button>
    );
}