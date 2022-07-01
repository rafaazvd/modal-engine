import { firebaseStorage } from '../../../firebase'

// await uploadFile('test.png', 'name', tokenAccess)
export const uploadImageToStorage = async (
  file: string, // test.png
  filename: string, // name img
  token: string // uuid
) => {
  try {
    const bucket = firebaseStorage.bucket(`gs://weconnect-d7b32.appspot.com`)
    const storage: any = await bucket.upload(file, {
      public: true,
      contentType: 'image/png',
      destination: `docs/rg/${filename}`,
      metadata: {
        firebaseStorageDownloadTokens: token,
        contentType: 'image/png',
      },
    })
    if (storage[0]) {
      return `https://firebasestorage.googleapis.com/v0/b/weconnect-d7b32.appspot.com/o/docs%2Frg%2F${filename}?alt=media&token=${token}`
    }
  } catch (error) {
    console.log({ error })
  }
}
