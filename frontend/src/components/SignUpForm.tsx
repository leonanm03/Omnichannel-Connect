'use client'
import instance from '@/services/api'
import { useFormik } from 'formik'
import { useState } from 'react'

export function SignUpForm() {
    const [validCep, setValidCep] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            cep: '',
            uf: '',
            city: '',
            neighborhood: '',
            street: '',
            number: '',
            complement: '',
            phone: ''
        },
        onSubmit: async (values) => {
            if (!validCep) {
                const address = await findCepOrFail(values.cep)
                if (address.erro) return
                completeAddress(address)
                setValidCep(true)
            }

            if (values.password !== values.confirmPassword) {
                alert('Senhas não conferem')
                return
            }

            const body = {
                name: values.name,
                email: values.email,
                password: values.password,
                address: `${values.street}, ${values.number} - ${values.neighborhood}, ${values.city} - ${values.uf} - ${values.cep}`,
                phone: values.phone
            }

            try {
                const user = await instance.post('/user/create', body)
                console.log(user)
            } catch (error) {
                console.error(error)
            }
        }
    })

    async function onBlurCep(e: React.FocusEvent<HTMLInputElement>) {
        const { value } = e.target
        setValidCep(false)

        const address = await findCepOrFail(value)
        if (address.erro) {
            return
        } else {
            completeAddress(address)
            setValidCep(true)
        }
    }

    function completeAddress(data: Address) {
        formik.setFieldValue('cep', data.cep)
        formik.setFieldValue('uf', data.uf)
        formik.setFieldValue('city', data.localidade)
        formik.setFieldValue('neighborhood', data.bairro)
        formik.setFieldValue('street', data.logradouro)
        formik.setFieldValue('complement', data.complemento)
    }

    return (
        <section className="bg-white dark:bg-gray-900 h-full">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <div className="hidden lg:relative lg:block lg:p-12">
                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Bem vindo(a) à Bemol Digital
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Realize seu cadastro e tenha acesso a todos os
                            nossos produtos e serviços.
                        </p>
                    </div>
                </section>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                            <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
                                Bem vindo(a) à Bemol Digital
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                                Realize seu cadastro e tenha acesso a todos os
                                nossos produtos e serviços.
                            </p>
                        </div>

                        <form
                            action="#"
                            onSubmit={formik.handleSubmit}
                            className="mt-8 grid grid-cols-6 gap-6"
                        >
                            <div className="col-span-6">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Nome Completo
                                </label>

                                <input
                                    required
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
                            </div>

                            <div className="col-span-6">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Email
                                </label>

                                <input
                                    required
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Senha
                                </label>

                                <input
                                    required
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Confirma Senha
                                </label>

                                <input
                                    required
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                />
                            </div>

                            <div className="col-span-4 sm:col-span-2">
                                <label
                                    htmlFor="cep"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    CEP
                                </label>

                                <input
                                    required
                                    type="text"
                                    id="cep"
                                    name="cep"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.cep}
                                    onBlur={onBlurCep}
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="uf"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Estado
                                </label>

                                <input
                                    required
                                    type="text"
                                    id="uf"
                                    name="uf"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.uf}
                                />
                            </div>

                            <div className="col-span-3">
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Cidade
                                </label>

                                <input
                                    required
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                />
                            </div>

                            <div className="col-span-3">
                                <label
                                    htmlFor="neighborhood"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Bairro
                                </label>

                                <input
                                    required
                                    type="text"
                                    id="neighborhood"
                                    name="neighborhood"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.neighborhood}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="street"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Logradouro
                                </label>

                                <input
                                    required
                                    type="text"
                                    id="street"
                                    name="street"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.street}
                                />
                            </div>

                            <div className="col-span-2 sm:col-span-2">
                                <label
                                    htmlFor="number"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Número
                                </label>

                                <input
                                    required
                                    type="text"
                                    id="number"
                                    name="number"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.number}
                                />
                            </div>

                            <div className="col-span-4 sm:col-span-4">
                                <label
                                    htmlFor="complement"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Complemento
                                </label>

                                <input
                                    type="text"
                                    id="complement"
                                    name="complement"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.complement}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-6">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    Tefefone
                                </label>

                                <input
                                    required
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                />
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Criando uma conta você concorda com os{' '}
                                    <a
                                        href="#"
                                        className="text-gray-700 underline dark:text-gray-200"
                                    >
                                        termos e condições
                                    </a>{' '}
                                    e a{' '}
                                    <a
                                        href="#"
                                        className="text-gray-700 underline dark:text-gray-200"
                                    >
                                        política de privacidade
                                    </a>
                                    .
                                </p>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    type="submit"
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                                >
                                    Criar conta
                                </button>

                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                    já tem uma conta?{' '}
                                    <a
                                        href="#"
                                        className="text-gray-700 underline dark:text-gray-200"
                                    >
                                        Faça login
                                    </a>
                                    .
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    )
}

async function findCepOrFail(value: string): Promise<Address> {
    const cep = value?.replace(/[^0-9]/g, '')

    if (cep?.length !== 8) {
        return { erro: true } as Address
    }

    try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = (await res.json()) as Address
        if (data.erro) {
            alert(`CEP ${value} inválido`)
            return data
        }

        return data
    } catch (error) {
        console.error(error)
        return { erro: true } as Address
    }
}

type Address = {
    cep?: string
    logradouro?: string
    complemento?: string
    bairro?: string
    localidade?: string
    uf?: string
    ibge?: string
    gia?: string
    ddd?: string
    siafi?: string
    erro?: boolean
}
