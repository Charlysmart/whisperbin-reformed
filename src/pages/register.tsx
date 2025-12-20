import AuthInputs from "@/components/authInputs";
import Button from "@/components/button";
import Logo from "@/components/logo";


const Register = () => {
    return (
        <div className="w-full lg:block md:flex overflow-y-auto body">
            <section className="flex w-full justify-center items-center py-5">
                <div className="lg:w-[40%] md:w-[70%] w-[90%] h-fit border border-gray-200 bg-white hover:shadow rounded-2xl md:px-10 px-3 py-10 font-inter">
                    <div className="flex justify-center mb-3">
                        <Logo />
                    </div>
                    <p className="md:text-[24px] text-[16px] mb-4 text-center">Create Your Anonymous Account</p>

                    <form className="flex flex-col gap-5">
                        <AuthInputs label="Anonymous Handle" attribute="username" placeholder="Enter your unique username" />
                        <AuthInputs label="E-mail" attribute="email" placeholder="Enter your email" />
                        <AuthInputs label="Password" attribute="password" placeholder="Enter your password" />
                        <AuthInputs label="Confirm Password" attribute="confirmPassword" placeholder="Confirm your password" />
                    </form>
                    <p className="md:text-[14px] text-[12px] mt-2 text-center">Your privacy is our priority. We handle your data with utmost care.</p>
                    <div className="mt-5 flex flex-col gap-4">
                        <Button label="Register" buttonType="colored" extraClass="w-full" />
                        <Button label="Already have an account? Login" buttonType="outlined" extraClass="w-full" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register;