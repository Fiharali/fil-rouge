<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/dashboard', function () {
    return User::all();
});




Route::get('/sanctum/csrf-cookie', [\Laravel\Sanctum\Http\Controllers\CsrfCookieController::class, 'show']);

    Route::get('/test', function () {
        $data = [
            ['id' => 1, 'name' => 'John Doe', 'age' => 30],
            ['id' => 2, 'name' => 'Jane Smith', 'age' => 25],
            ['id' => 3, 'name' => 'Alice Johnson', 'age' => 35]
        ];

        return response()->json($data);
    });


require __DIR__.'/auth.php';
