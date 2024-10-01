import style from './Container.module.css'

const Container = ({customClassName, children}) => {


    return (
        <main className={`${style.container} ${customClassName}`}>
            {children}
        </main>
    )
}

export default Container