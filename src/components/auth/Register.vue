<template>
    <div class="main">
        <div class="section-box shop-template mt-60">
            <div class="container">
                <div class="row mb-100">
                    <div class="col-lg-1"></div>
                    <div class="col-lg-5">
                        <h3>Create an account</h3>
                        <p class="font-md color-gray-500">Access to all features. No credit card required.</p>
                        <div class="form-register mt-30 mb-30">
                            <div class="form-group">
                                <label class="mb-5 font-sm color-gray-700">Full Name *</label>
                                <input class="form-control" type="text" placeholder="Steven job">
                            </div>
                            <div class="form-group">
                                <label class="mb-5 font-sm color-gray-700">Email *</label>
                                <input class="form-control" type="text" placeholder="stevenjob@gmail.com">
                            </div>
                            <div class="form-group">
                                <label class="mb-5 font-sm color-gray-700">Username *</label>
                                <input class="form-control" type="text" placeholder="stevenjob">
                            </div>
                            <div class="form-group">
                                <label class="mb-5 font-sm color-gray-700">Password *</label>
                                <input class="form-control" type="password" placeholder="******************">
                            </div>
                            <div class="form-group">
                                <label class="mb-5 font-sm color-gray-700">Re-Password *</label>
                                <input class="form-control" type="password" placeholder="******************">
                            </div>
                            <div class="form-group">
                                <label>
                                    <input class="checkagree" type="checkbox">By clicking Register button, you agree our
                                    terms and policy,
                                </label>
                            </div>
                            <div class="form-group">
                                <input class="font-md-bold btn btn-buy" type="submit" value="Sign Up">
                            </div>
                            <div class="mt-20"><span class="font-xs color-gray-500 font-medium">Already have an
                                    account?</span><router-link class="font-xs color-brand-3 font-medium" to="/login">
                                    Sign In</router-link></div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="box-login-social pt-65 pl-50">
                            <h5 class="text-center">Use Social Network Account</h5>
                            <div class="box-button-login mt-25"><a
                                    class="btn btn-login font-md-bold color-brand-3 mb-15">Sign up with<img
                                        :src="imgs.google" alt="Ecom"></a><a
                                    class="btn btn-login font-md-bold color-brand-3 mb-15">Sign up with<span
                                        class="color-blue font-md-bold">Facebook</span></a><a
                                    class="btn btn-login font-md-bold color-brand-3 mb-15">Sign up with<img
                                        :src="imgs.amazon" alt="Ecom"></a></div>
                            <div class="mt-10 text-center"><span class="font-xs color-gray-900">Buying for
                                    work?</span><a class="color-brand-1 font-xs" href="#">Create a free business
                                    account</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import imgs from '../../js/images'
export default {
    data() {
        return {
            imgs
        }
    }
}
</script>