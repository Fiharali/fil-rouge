<?php

use App\Http\Controllers\api\admin\UserController;
use App\Http\Controllers\api\Auth\AuthController;
use App\Http\Controllers\api\user\ProfileUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/sanctum/csrf-cookie', [\Laravel\Sanctum\Http\Controllers\CsrfCookieController::class, 'show']);

//auths
Route::post('/register', [AuthController::class, 'Register']);

Route::post('/login', [AuthController::class, 'login'])
    ->name('login');

//////

Route::apiResource('users', UserController::class);

Route::get('profile',[ProfileUserController::class, 'index']);
Route::post('profile',[ProfileUserController::class, 'update']);


