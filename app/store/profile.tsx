import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import useGetProfileByUserId from '../hooks/useGetProfileByUserId';
import useGetProfileByUserPost from '../hooks/useGetProfileByUserPost';
  
interface ProfileStore {
    currentProfile: any | null;
    setCurrentProfile: (userId: string) => void;
    setCurrentProfileByPost:(userId:string) => void;
}

export const useProfileStore = create<ProfileStore>()( 
    devtools(
        persist(
            (set) => ({
                currentProfile: null,

                setCurrentProfile: async (userId: string) => {
                    const result = await useGetProfileByUserId(userId)
                    console.log(result)
                    set({ currentProfile: result });
                },
                setCurrentProfileByPost: async (userId: string) => {
                    const result = await useGetProfileByUserPost(userId)
                    console.log(result)
                    set({ currentProfile: result });
                },
            }),
            { 
                name: 'store', 
                storage: createJSONStorage(() => localStorage) 
            }
        )
    )
)
