import BtnActive from "../components/Geral/Button/BtnActive";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-evenly">
      <div>
        <BtnActive title="Entrar" page="/login" size="btnHeader" width='full' margin='xs'/>
      </div>
    </main>
  );
}
