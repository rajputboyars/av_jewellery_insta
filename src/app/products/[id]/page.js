
import { serverFetch } from "@/lib/serverFetch";
import { cookies } from "next/headers";
import Link from "next/link";
import {

    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'

export default async function GetProduct({ params }) {

    const { id } = await params;
    const cookieStore = await cookies();
    const cookiesData = cookieStore.get('token');
    const token = cookiesData?.value || null;

    const res = await serverFetch(`${process.env.FRONTEND_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const product = res.ok ? await res.json() : null;

    if (!product) {
        return <div className="container mx-auto p-4">Product not found</div>;
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const whatsappMessage = encodeURIComponent(
        `Hi, I'm interested in purchasing the ${product.name} (${product.category
        }) priced at $${product.price.toFixed(2)}. Can you provide more details?`
    );
    const whatsappLink = `https://wa.me/918864910917?text=${whatsappMessage}`;

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 pt-24 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <Link href="/products">
                    <button className=" text-amber-500 py-2 pb-8 rounded flex cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Back To Products
                    </button>
                </Link>
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Image gallery */}
                    <TabGroup className="flex flex-col-reverse md:gap-6 md:flex-row-reverse">
                        {/* Image selector */}
                        <div className="mx-auto max-md:mt-6  w-full max-w-2xl lg:max-w-none">
                            <TabList className="grid grid-cols-4 md:grid-cols-1 gap-6 md:w-[50%]">
                                {product.images.map((image, index) => (
                                    <Tab
                                        key={index}
                                        className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-amber-500/50 focus:ring-offset-4 focus:outline-hidden"
                                    >
                                        <span className="sr-only">{product.name + index}</span>
                                        <span className="absolute inset-0 overflow-hidden rounded-md">
                                            <img alt={product.name + index} src={image} className="size-full object-cover" />
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-amber-500"
                                        />
                                    </Tab>
                                ))}
                            </TabList>
                        </div>

                        <TabPanels>
                            {product.images.map((image, index) => (
                                <TabPanel key={index}>
                                    <img alt={product.name + index} src={image} className="aspect-square w-full object-cover sm:rounded-lg" />
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </TabGroup>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <div className="flex gap-2">
                                <p className="text-3xl tracking-tight text-gray-900">₹{product.discount}</p>
                                <p className="text-xl tracking-tight text-gray-400 self-end line-through">{product.price}</p>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="mt-3">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            aria-hidden="true"
                                            className={classNames(
                                                product.rating > rating ? 'text-amber-500' : 'text-gray-300',
                                                'size-5 shrink-0',
                                            )}
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{product.rating} out of 5 stars</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">category</h3>

                            <p
                                className="space-y-6 text-base text-gray-700"
                            >
                                {product.category}
                            </p>
                        </div>
                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>

                            <p
                                className="space-y-6 text-base text-gray-700"
                            >
                                {product.description}
                            </p>
                        </div>

                        <form className="mt-6">
                            <div className="mt-10 flex">
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-amber-600 flex-1 text-white text-center font-semibold py-2 px-4 rounded-md hover:bg-amber-700 transition-colors"
                                    aria-label={`Buy ${product.name} via WhatsApp`}
                                >
                                    Buy Now
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
