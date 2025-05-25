import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

export default function Header() {
    const classLinks = ({ isActive } : { isActive : boolean }) =>
        `${isActive ? 'text-orange-500' : 'text-white'} uppercase font-bold`;

    const { pathname } = useLocation()

    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore( state => state.fetchCategories);
    const { drinks } = useAppStore( state => state.categories);
    const searchRecipies = useAppStore( state => state.searchRecipies);
    const showNotification = useAppStore(state => state.showNotification)

    useEffect(() => {
        fetchCategories()
    }, []);

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(searchFilters).includes('')){
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        searchRecipies(searchFilters)
    }
    

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="/logo.svg" alt="Logo Page" className='w-32' />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink 
                            to='/' 
                            className={classLinks}
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            to='/favoritos'
                            className={classLinks}
                        >
                            Favoritos
                        </NavLink>
                        <NavLink
                            to='/generate'
                            className={classLinks}
                        >
                            Generar con IA
                        </NavLink>
                    </nav>
                </div>
                {/* Solo si estamos en el / */}
                {isHome && (
                    <form 
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label 
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Nombre o ingredientes
                            </label>
                            <input 
                                id="ingredient" 
                                type="text" 
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                                value={searchFilters.ingredient}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-4">
                            <label 
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Categoría
                            </label>
                            <select 
                                id="category" 
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                value={searchFilters.category}
                                onChange={handleChange}
                            >
                                <option value="">-- Seleccione --</option>
                                {drinks.map(drink => (
                                    <option
                                        key={drink.strCategory}
                                        value={drink.strCategory}
                                    >
                                        {drink.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input 
                            type="submit" 
                            value="Buscar Recetas" 
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                        />
                    </form>
                )}
            </div>
        </header>
    );
}