import style from './newProject.module.css';
import ProjectForm from '../projects/ProjectForm'

const NewProject = () => {
    function createPost(project) {
        //INICIALIZAR SERVIÇOS E COSTS
        project.cost = 0
        project.services = []
    }

    return (
        <>
            <div className={style.newProject}>
                <h1 className={style.h1}>criar projecto</h1>
                <p className={""}>crie seu projecto para depois adicionar-los aos nossos serviços</p>
                <ProjectForm
                    handleSubmit={createPost}
                />
            </div>
        </>
    )
}

export default NewProject;