import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      name: null,
      email: null,
      role: null,

      login: ({ name, email, role }) =>
        set({
          isLoggedIn: true,
          name,
          email,
          role,
        }),

      logout: () =>
        set(() => ({
          isLoggedIn: false,
          name: null,
          email: null,
          role: null,
        })),
    }),
    {
      name: "auth",
      getStorage: () => localStorage,
    }
  )
);

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const initialAuthState = {
//   accessExpirationTime: null,
//   isLoggedIn: false,
//   name: null,
//   role: null,
//   profileImage: null,
// };

// export const useAuthStore = create(
//   persist(
//     (set) => ({
//       ...initialAuthState,

//       login: ({ accessExpirationTime, name, role, profileImage }) =>
//         set({
//           accessExpirationTime,
//           isLoggedIn: true,
//           name,
//           role,
//           profileImage,
//         }),

//       logout: () =>
//         set({
//           ...initialAuthState,
//           isLoggedIn: false,
//         }),

//       updateUserInfo: ({ name, profileImage }) =>
//         set((state) => ({
//           ...state,
//           name,
//           profileImage,
//         })),
//     }),
//     {
//       name: "auth",
//       getStorage: () => localStorage,
//     }
//   )
// );
