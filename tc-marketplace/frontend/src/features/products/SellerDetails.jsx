

export const SellerDetails = ({store}) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Store Information
            </h3>

            <div className="space-y-2 text-gray-700">
            <p>
                <span className="font-medium">Company Name:</span> {store.name}
            </p>

            <p>
                <span className="font-medium">Email:</span> {store.contactEmail}
            </p>

            <p>
                <span className="font-medium">Phone:</span> {store.contactPhone}
            </p>

            <p>
                <span className="font-medium">Location:</span> {store.location}
            </p>
            </div>
        </div>
    )
}