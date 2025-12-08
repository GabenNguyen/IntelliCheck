import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen w-full h-full bg-gray-50 dark:bg-gray-900 p-4 mt-3">
            <div className="w-full max-w-3xl">
                <UserProfile />
            </div>
        </div>
    )
}

export default UserProfilePage