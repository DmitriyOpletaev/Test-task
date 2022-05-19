import {ChangeEvent, FC, useEffect, useState} from "react"
import './CommonElements.sass'
import {substringImageName} from "../../helpers/helpers"


export const PhotoUploadField: FC<PhotoUploadFieldProps> = (
    {uploadFile,fieldName}
) => {

    const [fileError, setFileError] = useState(null as string|null)
    const [currentFile, setCurrentFile] = useState(null as File | null)
    const [fieldTouched,setFieldTouched] = useState(false)

    function handleChange({currentTarget}: ChangeEvent<HTMLInputElement>) {
        setFieldTouched(true)
        currentTarget.files && currentTarget.files.length>0  ? setCurrentFile(currentTarget.files[0]):setCurrentFile(null)
    }

    useEffect(() => {
        if (currentFile) {
            uploadFile(null)
            const {type, size} = currentFile
            if (size > 5 * 1024 * 1024) {
                setFileError('Photo size must not be greater than 5 Mb')
                return
            } else if (type !== 'image/jpeg' && type !== 'image/jpg') {
                setFileError('Photo format must be jpeg or jpg type')
                return
            } else {
                const img = new Image()
                img.src = URL.createObjectURL(currentFile)
                img.onload = function () {
                    if (img.width < 70 || img.height < 70) {
                        setFileError('Minimum size of photo must be 70x70px')
                    } else {
                        uploadFile(currentFile)
                        setFileError('')
                    }
                    URL.revokeObjectURL(img.src)
                }
            }
        }
    }, [currentFile])

    useEffect(()=>{
        fieldTouched && !currentFile && setFileError('Please upload photo')
    },[currentFile])
    useEffect(()=>{
        !currentFile && uploadFile(null)
    },[currentFile])

    const UploadPhotoName =
        <span className={'photo-upload-block-text'}>
            {currentFile ? substringImageName(currentFile.name) : 'Upload your photo'}
        </span>

    const UploadErrorMessage = fileError &&
        <div className={'error-message'}>{fileError}</div>

    return (
        <div className={'upload-field-container'}>
            <div className={`photo-upload-field ${fileError && 'error'}`}>
                <button type={'button'} className={'upload-button'}>
                    <label
                        htmlFor="user-photo-upload"
                        className="photo-upload-label"
                    >
                        <span className={'photo-upload-button-text'}>
                            Upload
                        </span>
                    </label>
                </button>
                <div className={'photo-name-container'}>
                    <label htmlFor={'user-photo-upload'} className="photo-upload-label">
                        {UploadPhotoName}
                    </label>
                </div>
                <input
                    onClick={()=>setFileError('')}
                    onChange={handleChange}
                    type="file"
                    className="original-file-input"
                    id="user-photo-upload"
                    name={fieldName}
                />
            </div>
            {UploadErrorMessage}

        </div>
    )
}


type PhotoUploadFieldProps = {
    fieldName: string
    uploadFile: (file: File|null) => void
}