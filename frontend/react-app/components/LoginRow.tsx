
export default function LoginRow({name, textType, variable, onChange}: {name: string, textType: string, variable: string, onChange: (value: string) => void}){

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(e.target.value)
    }

    return(
        <div className='flex flex-row justify-between gap-4'>
            <p>{name}:</p>
            <input className='border rounded px-2' type={textType} placeholder={name} value={variable} onChange={handleChange}/>
        </div>
    )
}