import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";
import ContentWrapper from "../../components/ContentWrapper.jsx";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [submitError, setSubmitError] = useState("");
  
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      // Validate required fields
      if (!name?.trim()) return toast.error("Name is required");
      if (!description?.trim()) return toast.error("Description is required");
      if (!price || price <= 0) return toast.error("Valid price is required");
      if (!category) return toast.error("Category selection is required");
      if (!quantity || quantity <= 0) return toast.error("Valid quantity is required");
      if (!brand?.trim()) return toast.error("Brand is required");
      if (!image) return toast.error("Product image is required");

      console.log("Submitting product with data:", {
        name, description, price, category, quantity, brand, image, stock
      });

      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('description', description.trim());
      formData.append('price', Number(price));
      formData.append('category', category);
      formData.append('quantity', Number(quantity));
      formData.append('brand', brand.trim());
      formData.append('countInStock', Number(stock) || Number(quantity));
      formData.append('image', image);

      const result = await createProduct(formData).unwrap();
      console.log("Product creation result:", result);

      if (result._id) {
        toast.success("Product created successfully!");
        navigate("/admin/allproductslist");
      } else {
        setSubmitError("Failed to create product");
        toast.error("Failed to create product");
      }
    } catch (err) {
      console.error("Product creation error:", err);
      const errorMessage = err?.data?.message || err?.message || "Failed to create product";
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-[#0E1629] min-h-[100vh]">
      <ContentWrapper>
        <div className="grid place-content-center items-center text-[#eaeaea] py-5 mx-4">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col">
              <div className="mb-1">
                <h1 className="text-xl md:text-2xl 2xl:text-3xl font-semibold mb-4 text-[#F6F6F6]">
                  Create Product
                </h1>
              </div>

              {imageUrl && (
                <div className="text-center">
                  <img
                    src={imageUrl}
                    alt="product"
                    className="block max-h-[200px] w-[320px] md:w-[460px] xl:w-[98%] max-w-full object-contain object-center rounded-lg shadow-lg mb-4"
                  />
                </div>
              )}

              <div className="mb-1 ml-2">
                <label className="border rounded border-[#444444] xl:px-4 block w-[320px] md:w-[460px] xl:w-[98%] text-center cursor-pointer py-4 text-base 2xl:text-xl font-semibold mb-1 text-[#F6F6F6] overflow-hidden">
                  {image ? image.name : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className={`${!image ? "hidden" : " "} ml-6 mt-1 p-2 bg-[#0E1629] placeholder-[#eaeaeab9] text-[#db1143f3] outline-none border-none text-base`}
                  />
                </label>
              </div>

              <form onSubmit={handleSubmit} className="p-3">
                <div className="flex flex-wrap gap-6">
                  <div className="one">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 p-2 border rounded w-[320px] md:w-[460px] 2xl:w-[520px] mb-4 bg-[#0E1629] placeholder-[#eaeaeab9] text-[#F6F6F6] outline-none border-[#444444] focus:border-[#FF2E63]"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="two">
                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      id="price"
                      className="mt-1 p-2 border rounded w-[320px] md:w-[460px] 2xl:w-[520px] mb-4 bg-[#0E1629] placeholder-[#eaeaeab9] text-[#F6F6F6] outline-none border-[#444444] focus:border-[#FF2E63]"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="one">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      id="quantity"
                      className="mt-1 p-2 border rounded w-[320px] md:w-[460px] 2xl:w-[520px] mb-4 bg-[#0E1629] placeholder-[#eaeaeab9] text-[#F6F6F6] outline-none border-[#444444] focus:border-[#FF2E63]"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="two">
                    <label htmlFor="brand">Brand</label>
                    <input
                      type="text"
                      id="brand"
                      className="mt-1 p-2 border rounded w-[320px] md:w-[460px] 2xl:w-[520px] mb-4 bg-[#0E1629] placeholder-[#eaeaeab9] text-[#F6F6F6] outline-none border-[#444444] focus:border-[#FF2E63]"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    className="mt-1 p-2 border rounded mb-1 bg-[#0E1629] placeholder-[#eaeaeab9] text-[#F6F6F6] outline-none border-[#444444] focus:border-[#FF2E63] w-[320px] md:w-[460px] xl:w-[100%]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div>
                    <label htmlFor="stock">Count In Stock</label>
                    <input
                      type="text"
                      id="stock"
                      className="mt-1 p-2 border rounded w-[320px] md:w-[460px] 2xl:w-[520px] mb-4 bg-[#0E1629] placeholder-[#eaeaeab9] text-[#F6F6F6] outline-none border-[#57575b] focus:border-[#FF2E63]"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      className="mt-1 p-2 border rounded w-[320px] md:w-[460px] 2xl:w-[520px] mb-4 bg-[#0E1629] placeholder-[#eaeaeab9] text-[#F6F6F6] outline-none border-[#57575b] focus:border-[#FF2E63]"
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                    >
                      <option value="">Select a category</option>
                      {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="xl:flex xl:justify-center xl:items-center">
                  <button
                    type="submit"
                    className="bg-[#db1143f3] hover:bg-[#FF2E63] transition-colors text-white border-none outline-none w-[320px] md:w-[460px] lg:w-[100%] px-4 py-2 rounded cursor-pointer my-[1rem] text-base font-semibold disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default ProductList;
