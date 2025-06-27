"use client"

import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"

import { Loader, Upload } from "lucide-react"
import { toast } from "sonner"

import img from "../../../../../../public/user.png"
import { updateProfileAvatar } from "../_actions/update-avatar"

interface AvatarProps {
  avatarUrl: string | null
  userId: string
}

export function Avatar({ avatarUrl, userId }: AvatarProps) {
  const [previewImage, setPreviewImage] = useState(avatarUrl)
  const [loading, setLoading] = useState(false)

  const { update } = useSession()

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setLoading(true)
      const image = e.target.files[0]

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.error("Formato inválido! Use JPEG ou PNG.)")
        return
      }

      const newFileName = `${userId}`
      const newFile = new File([image], newFileName, { type: image.type })

      const urlImage = await uploadImage(newFile)

      if (!urlImage || urlImage === "") {
        toast.error("Falha ao alterar imagem!")
        return
      }

      setPreviewImage(urlImage)

      await updateProfileAvatar({ avatarUrl: urlImage })
      await update({
        image: urlImage,
      })

      setLoading(false)
    }
  }

  async function uploadImage(image: File): Promise<string | null> {
    try {
      const formData = new FormData()

      formData.append("file", image)
      formData.append("userId", userId)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      )

      const data = await response.json()

      if (!response.ok) {
        return null
      }

      toast.success("Imagem alterada com sucesso!")
      return data.secure_url as string
    } catch (err) {
      console.log(err)
      return null
    }
  }

  return (
    <div className="relative h-40 w-40 md:h-48 md:w-48">
      <div className="relative flex h-full w-full items-center justify-center">
        <span className="absolute right-2 bottom-2 z-[2] cursor-pointer rounded-full bg-white/80 p-2 shadow">
          {loading ? (
            <Loader size={16} className="animate-spin" />
          ) : (
            <Upload size={16} />
          )}
        </span>

        <input
          type="file"
          className="z-50 h-48 w-48 cursor-pointer opacity-0"
          title="Trocar Imagem"
          onChange={handleChange}
        />
      </div>

      {previewImage ? (
        <Image
          src={previewImage}
          alt="Foto de perfil da clínica"
          fill
          className="bg-background h-48 w-full rounded-full object-cover shadow-xl"
          quality={100}
          priority
          sizes="(max-width: 480px) 100vw, (max-heidth: 1024px) 75vw, 60vw"
        />
      ) : (
        <Image
          src={img}
          alt="Foto de perfil da clínica"
          fill
          className="bg-background h-48 w-full rounded-full object-cover"
          quality={100}
          priority
          sizes="(max-width: 480px) 100vw, (max-heidth: 1024px) 75vw, 60vw"
        />
      )}
    </div>
  )
}
