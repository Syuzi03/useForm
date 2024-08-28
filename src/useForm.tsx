import { useForm } from './hook'
import { FormValues } from './hook'

export const UseForm = () => {

    const { handleSubmit, register, errors } = useForm()
    const handleAdd = (data: FormValues) => {
        console.log(data)
    }
    return <>

        <form onSubmit={handleSubmit(handleAdd)}>
            <div>
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                <input
                    {...register('name', { required: 'please fill name' })}
                />
            </div>

            <div>
                {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}

                <input
                    {...register("age", { required: 'lracra surname-d' })}
                />
            </div>
            <button>save</button>
        </form>
    </>
}