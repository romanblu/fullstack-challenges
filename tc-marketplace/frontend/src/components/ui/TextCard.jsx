
const TextCard = ({title, description, icon}) => {
    return (
        <div className="bg-green-900/40 p-6 rounded-xl hover:bg-green-800/60 transition">
            {icon && <div className="text-4xl mb-3">{icon}</div>}
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p>{description}</p>
        </div>
    );
}


export default TextCard