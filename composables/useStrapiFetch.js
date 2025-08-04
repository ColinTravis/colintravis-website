import qs from "qs";

const StrapiQuery = {
  sort: null,
  filters: null,
  populate: null,
  fields: null,
  pagination: null,
  publicationState: null,
};

export const useStrapiFetch = async (
  path,
  strapiQuery = {},
  fetchOptions = {}
) => {
  // console.log(
  //   "useStrapiFetch called with path:",
  //   path,
  //   "and query:",
  //   strapiQuery
  // );
  const config = useRuntimeConfig();
  const strapiUrl = config.public.strapiBaseUrl || "http://localhost:1337";
  const strapiApi = config.public.strapiApi;

  const queryString = qs.stringify(strapiQuery, { encodeValuesOnly: true });
  // queryString = queryString.replace(/%2A/g, "*");
  const finalUrl = `${strapiUrl}/api${path}${queryString ? `?${queryString}` : ""}`;

  const options = {
    headers: {
      Authorization: `Bearer ${strapiApi}`,
    },
    ...fetchOptions,
  };

  // console.log("Final Strapi request URL:", finalUrl);
  const response = await $fetch(finalUrl, options);
  // console.log("Strapi response:", response);
  return response;
};
