
export default function ImageUploader({ blogId, onReady }) {
    const [image, setImage] = useState([]);
    const { user } = useAuth();
    
    useEffect(() => {
        if(onReady) {
            onReady(image);
        }
    }, [image, onReady]);

    const updateImage = (id, updates) => {
        setImage(prev =>
            prev.map(img =>
            img.id === id ? { ...img, ...updates } : img
            )
        );
    };
    
    const handleFilesAdded = async (newFiles) => {
        const startOrder = images.length

        const previewObjects = newFiles.map((file, index )=> {

            const base = {
                id: crypto.randomUUID(), 
                file: file,
                storeId: storeId,
                previewUrl: URL.createObjectURL(file),
                uploadStatus: 'idle',
                url: null,
                key: null,
                order: startOrder + index,
            }

            if (productId) {
                base.productId = productId;
            } else {
                base.sessionId = sessionId.current;
            }
            return base
        });

        setImage(prev => [...prev, ...previewObjects]);
    };

    const handleUpload = async () => {
        
        
        if (img.uploadStatus === 'uploaded') return; 

        updateImage(img.id, { uploadStatus: "uploading" });

        try {
            const base = {
                storeId: user.store,
            }
            if(productId) {
                base.productId = productId;
            } else {
                base.sessionId = sessionId.current;
            }

            const res = await uploadFile({file: img.file, storeId, productId, sessionId: sessionId.current});

            if(res.success) {
                updateImage(img.id, { 
                    uploadStatus: 'uploaded',
                    key: res.key,
                    url: res.publicUrl
                })
            }

        } catch (err) {
            updateImage(img.id, { uploadStatus: 'error' });
            console.error("Error uploading image:", err);
        }
        
    }
    

    return (
        <div>
            <ImageDropzone onFilesAdded={handleFilesAdded}/>
            <button type="button" onClick={handleUpload} className="bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold py-2 rounded-md shadow-md mt-4 px-2">
                Upload Image
            </button>
        </div>
    )
}