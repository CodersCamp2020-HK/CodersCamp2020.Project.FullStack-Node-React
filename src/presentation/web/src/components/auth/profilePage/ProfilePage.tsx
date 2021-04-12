import React, { useContext } from 'react';
import RegisterForm from '../../forms/registerForm/RegisterForm';
import { AppCtx } from '../../../App';
import { useGetUser } from '../../../client';

const ProfilePage = () => {
    const { appState } = useContext(AppCtx);
    const { data: userData, loading } = useGetUser({ userId: appState.userId!, requestOptions: { headers: { access_token: localStorage.getItem('apiKey') ?? '' } } })
    console.log(userData)

    const handleSubmit = async (data: any) => {
        console.log(data);
    }
    if (!loading && userData && userData.birthDate)  {
        const [year, month, date] = userData.birthDate.split('-').map((value) => parseInt(value))
        return (
            <RegisterForm handleSubmit={handleSubmit} defaultValues={{
                name: userData.name,
                surname: userData.surname,
                mail: userData.mail,
                phone: userData.phone,
                birthDate: new Date(year, month, date)
            }} hiddenPassword={true} />
        )
    }
    return <div>loading</div>
}

export default ProfilePage
