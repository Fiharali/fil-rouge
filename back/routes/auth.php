<?php

use App\Http\Controllers\api\Auth\AuthController;
use Illuminate\Support\Facades\Route;

//Route::post('/register', [AuthController::class, 'Register']);

//Route::post('/login', [AuthController::class, 'login'])
              //  ->name('login');

//Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
//                ->middleware('guest')
//                ->name('password.email');
//
//Route::post('/reset-password', [NewPasswordController::class, 'store'])
//                ->middleware('guest')
//                ->name('password.store');
//
//Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
//                ->middleware(['auth', 'signed', 'throttle:6,1'])
//                ->name('verification.verify');
//
//Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
//                ->middleware(['auth', 'throttle:6,1'])
//                ->name('verification.send');
//
//Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
//                ->middleware('auth')
//                ->name('logout');
