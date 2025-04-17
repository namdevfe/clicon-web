import { UploadApiResponse } from 'cloudinary'

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string)

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData
    }
  )
  const uploadedImageData = (await uploadResponse.json()) as UploadApiResponse

  return uploadedImageData.secure_url && uploadedImageData.secure_url
}

export const uploadMultipleFiles = async (files: File[]): Promise<any[]> => {
  const formData = new FormData()

  const results = []
  for (const file of files) {
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string)

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    )

    const uploadedImageData = (await uploadResponse.json()) as UploadApiResponse

    if (uploadedImageData.secure_url) {
      results.push(uploadedImageData.secure_url)
    }
  }

  return results
}
