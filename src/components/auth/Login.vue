<template>
    <div class="main">
        <div class="section-box shop-template mt-60">
            <div class="container">
                <div class="row mb-100">
                    <div class="col-lg-1"></div>
                    <div class="col-lg-5">
                        <h3>Member Login</h3>
                        <p class="font-md color-gray-500">Welcome back!</p>
                        <div class="form-register mt-30 mb-30">
                            <div class="form-group">
                                <label class="mb-5 font-sm color-gray-700">Email / Phone / Username *</label>
                                <input class="form-control" type="text" placeholder="stevenjob@gmail.com">
                            </div>
                            <div class="form-group">
                                <label class="mb-5 font-sm color-gray-700">Password *</label>
                                <input class="form-control" type="password" placeholder="******************">
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="color-gray-500 font-xs">
                                            <input class="checkagree" type="checkbox">Remember me
                                        </label>
                                    </div>
                                </div>
                                <div class="col-lg-6 text-end">
                                    <div class="form-group"><a class="font-xs color-gray-500" href="#">Forgot your
                                            password?</a></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <input class="font-md-bold btn btn-buy" type="submit" value="Sign Up">
                            </div>
                            <div class="mt-20"><span class="font-xs color-gray-500 font-medium">Have not an
                                    account?</span><router-link class="font-xs color-brand-3 font-medium"
                                    to="/register">Sign Up</router-link></div>
                        </div>
                    </div>
                    <div class="col-lg-5"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>