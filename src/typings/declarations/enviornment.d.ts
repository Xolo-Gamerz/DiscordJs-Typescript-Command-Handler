declare global{
    namespace NodeJS{
        interface ProcessEnv{
            DATABASE_URL: string,
            TOKEN: string
        }
    }
}
export default{}