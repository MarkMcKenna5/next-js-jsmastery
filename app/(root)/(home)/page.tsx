import Filters from "@/components/ui/Filters";
import SearchForm from "@/components/ui/SearchForm";
import ResourceCard from "@/components/ui/ResourceCard";
import { getResources, getResourcesPlaylist } from "@/sanity/actions";

export const revalidate = 900;
import React from "react";
import Header from "@/components/ui/Header";

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const page = async ({ searchParams }: Props) => {
  const resources = await getResources({
    query: searchParams?.query || "",
    category: searchParams?.category || "",
    page: "1",
  });

  const resourceesPlaylist = await getResourcesPlaylist();

  console.log(resourceesPlaylist);

  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
      <section className="nav-padding w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center">
          <h1 className="sm:heading1 heading2 mb-6 tet-center text-white">
            JavaScript Mastery Resources
          </h1>
        </div>
        <SearchForm />
      </section>

      <Filters />
      {(searchParams?.query || searchParams?.category) && (
        <section className="flex-center mt-6 w-full flex-col sm:mt-20">
          <Header
            query={searchParams?.query || ""}
            category={searchParams?.category || ""}
          />

          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {resources?.length > 0 ? (
              resources.map((resource: any) => (
                <ResourceCard
                  key={resource._id}
                  title={resource.title}
                  id={resource._id}
                  image={resource.image}
                  downloadNumber={resource.views}
                  downloadLink={resource.downloadLink}
                />
              ))
            ) : (
              <p className="body-regular text-white-400">No resources found</p>
            )}
          </div>
        </section>
      )}

      {resourceesPlaylist.map((item: any) => (
        <section
          key={item._id}
          className="flex-center mt-6 w-full flex-col sm:mt-20"
        >
          <h2 className="heading3 self-start text-white-800">{item.title}</h2>
          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {item.resources.map((resource: any) => (
              <ResourceCard
                key={resource._id}
                title={resource.title}
                id={resource._id}
                image={resource.image}
                downloadNumber={resource.views}
                downloadLink={resource.downloadLink}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default page;
