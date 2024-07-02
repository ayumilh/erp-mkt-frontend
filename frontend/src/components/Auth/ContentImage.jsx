import Image from "next/image"
const ContentImage = () => {
  return (
    <div className="hidden lg:block w-[480px] h-[540px] xl:w-[600px] xl:h-[680px]">
      <Image src="/img/login-man.svg" alt="Ilustração de um desenho homem" width={600} height={700} />
    </div>
  )
}

export default ContentImage