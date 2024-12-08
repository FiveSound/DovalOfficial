import axios from "axios";
import { API, API_URL } from "../index";
import { QueryKeyType } from "../../types/ReactQuery.type";
import { USER_TOKEN } from "@/src/constants";
import { storage } from "@/src/components/native";

export const publishRecipeService = async (body: Object) => {
  const userToken = storage.getString(USER_TOKEN);
  const response = await axios.post(
    `${API_URL}/api/recipes/add`,
    {
      ...body,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  return response.data;
};

export const getAllRecipedService = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/recipes/all`, {});
    return response.data; // Retorna los datos directamente
  } catch (error) {
    console.log({ error });
    return []; // Retorna un arreglo vacío en caso de error
  }
};

export const getMyRecipesService = async (page: number) => {
  try {
    const userToken = storage.getString(USER_TOKEN);
    const response = await axios.post(
      `${API_URL}/api/recipes/my-recipes`,
      {
        page,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {};
  }
};

// interface LocationDetails {
//   latitude: number;
//   longitude: number;
// }
// export const feedService = async (
//   location: LocationDetails,
//   userID: string,
//   page: number,
// ) => {
//   try {
//     // # Page es obligatorio
//     // # userID no es obligatorio pero ayuda a traer un contenido mas personal, si no te retorna lo mas popular
//     // # Si no hay interacciones, orders, likes, views, comments, shared, saved te retornara un filtro popular
//     // # Latitude y longitude siempre priorizara el contenido mas cercano, lo mismo si no hay interacciones o si no hay un userID(no logueado)
//     const response = await axios.get(
//       `${API}/advanced?user_id=${userID}&page=${page}&latitude=${location.latitude}&longitude=${location.longitude}`,
//     );
//     return response.data;
//   } catch (error) {
//     console.log({ error });
//     return [];
//   }
// };

// export const getExploreData = async (location: object | null, page: number) => {
//   const userToken = storage.getString(USER_TOKEN);

//   if (userToken) {
//     let response = await axios.post(`${API_URL}/api/explore/public`, {
//       page,
//       ...location,
//     });

//     return response.data;
//   }

//   const response = await axios.post(
//     `${API_URL}/api/explore`,
//     {
//       page,
//       ...location,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${userToken}`,
//       },
//     },
//   );

//   return response.data;
// };

// export const getRelatedPosts = async (postID: number, page: number) => {
//   const response = await axios.post(`${API_URL}/api/explore/related`, {
//     postID,
//     page,
//   });
//   return response.data;
// };

export const testGetAllRecipes = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/recipes/all`, {});
    return response.data;
  } catch (error) {
    console.log({ error });

    return [];
  }
};

export const getAllCategoriesService = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/recipes/categories`, {});

    return response.data;
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const getCategoriesByRecipeID = async ({ queryKey }: any) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/recipes/categories-by-recipe`,
      {
        recipeID: queryKey[1],
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export const addDraftService = async (body: object) => {
  try {
    const userToken = storage.getString(USER_TOKEN);
    const response = await axios.post(
      `${API_URL}/api/recipes/draft`,
      {
        ...body,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return { success: true, ...response.data };
  } catch (error) {
    return { success: false, id: null, error };
  }
};

export const getDraftService = async (id: number) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/recipes/draft/id`,
    {
      id,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const onSaveDraftService = async (body: object) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/recipes/draft/save`,
    {
      ...body,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  return response.data;
};

export const onCompleteService = async (id: number) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/recipes/complete`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const getRecipeDrafts = async () => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/recipes/drafts`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  return response.data;
};

export const getVariantsByRecipeService = async (recipeID: number) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/recipes/variants`,
    {
      id: recipeID,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const addVariantService = async (id: number) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/recipes/add/variant`,
    {
      id,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const updateVariantService = async (body: object) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/recipes/update/variant`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};

export const addSubVariantService = async (id: number) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/recipes/add/subvariant`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { success: false };
  }
};

export const updateSubVariantService = async (body: object) => {
  try {
    const userToken = storage.getString(USER_TOKEN);

    const response = await axios.post(
      `${API_URL}/api/recipes/update/subvariant`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};

export const removeSubVariantService = async (id: number) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/recipes/remove/subvariant`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const removeVariantService = async (id: number) => {
  const userToken = storage.getString(USER_TOKEN);

  const response = await axios.post(
    `${API_URL}/api/recipes/remove/variant`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  return response.data;
};

export const getListCategoriesService = async (id: number) => {
  try {
    const response = await axios.post(`${API_URL}/api/recipes/list/categories`, {
      id,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const selectedCategoriesFromListService = async (recipeID: number, categoryID: number) => {
  const response = await axios.post(`${API_URL}/api/recipes/selected/categories`, {
    recipeID: recipeID,
    categoryID: categoryID,
  });

  return response.data;
};

export const getListTypesService = async (typeID: number) => {
  const response = await axios.post(`${API_URL}/api/recipes/list/types`, {
    typeID: typeID,
  });

  return response.data;
};

export const selectedTypeFromListService = async (recipeID: number, typeID: number) => {
  const response = await axios.post(`${API_URL}/api/recipes/selected/types`, {
    recipeID: recipeID,
    typeID: typeID,
  });

  return response.data;
};
