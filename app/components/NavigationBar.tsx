

export default function NavigationBar() {
  
  return (
    <nav className={"flex justify-between items-center"}>
      <div className={"flex items-center"}>
        <h1 className={"text-2xl font-bold"}>Bypolar</h1>
      </div>
      <div className={"flex items-center gap-4"}>
        <button className={"btn"}>Connexion</button>
        <button className={"btn btn-primary"}>Inscription</button>
      </div>
    </nav>
  )
}