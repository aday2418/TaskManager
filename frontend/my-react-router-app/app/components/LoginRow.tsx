interface LoginRowProps {
    name: string;
    textType: string;
    variable: string;
    functionName: (value: string) => void;
}

export default function LoginRow({name, textType, variable, functionName}: LoginRowProps){

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        functionName(e.target.value)
    }

    return(
        <div className='flex flex-row justify-between gap-4'>
            <p>{name}:</p>
            <input className='border rounded' type={textType} placeholder={name} value={variable} onChange={handleChange}/>
        </div>
    )
}