export async function uploadSingleImage (file, options = {}) {
    const { productId, slug, storeId } = options;

    if (!file) throw new Error("uploadSingleImage: file is required");

    const formData = new FormData();
    formData.append("image", file);

    // used for organizing the files in S3 buckets
    if (storeId) formData.append("storeId", storeId);
    if (productId) formData.append("productId", productId);
    if (slug) formData.append("slug", slug);

    const res = await fetch("/api/upload/single", {
        method: "POST",
        body: formData
        // NOTE: do NOT manually set Content-Type, browser will do it
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Image upload failed");
    }

    const data = await res.json();

    /** Expected backend response:
     *  {
     *      success: true,
     *      key: "store_123/products/slug/abc.jpg",
     *      url: "https://bucket.s3.amazonaws.com/store_123/products/slug/abc.jpg"
     *  }
     */

    return {
        key: data.key,
        url: data.url
    };

}