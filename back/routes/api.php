<?php

use App\Http\Controllers\api\admin\CampusController;
use App\Http\Controllers\api\admin\ClassNameController;
use App\Http\Controllers\api\admin\LevelController;
use App\Http\Controllers\api\admin\PromotionController;
use App\Http\Controllers\api\admin\UserController;
use App\Http\Controllers\api\Auth\AuthController;
use App\Http\Controllers\api\Rh\CongeController;
use App\Http\Controllers\api\staff\AbsenceController;
use App\Http\Controllers\api\user\ProfileUserController;
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

//Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
 //   return $request->user();
//});

//Route::get('/sanctum/csrf-cookie', [\Laravel\Sanctum\Http\Controllers\CsrfCookieController::class, 'show']);

//auths
//Route::post('/register', [AuthController::class, 'Register']);

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/reset-link', [AuthController::class, 'sendResetLink'])->name('resetLink');
Route::post('/reset-password', [AuthController::class, 'reset'])->name('resetPassword');

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::apiResource('users', UserController::class);
    Route::get('search-users', [UserController::class,'search']);
    Route::get('old-users', [UserController::class,'oldUsers']);
    Route::post('users-restore/{user}', [UserController::class,'restore'])->withTrashed();

    Route::apiResource('campuses', CampusController::class);
    Route::apiResource('classNames', ClassNameController::class);
    Route::apiResource('promotions', PromotionController::class);
    Route::apiResource('levels', LevelController::class);

    Route::apiResource('absences', AbsenceController::class)->only(['index','destroy']);
    Route::apiResource('absences', \App\Http\Controllers\api\apprenant\AbsenceController::class)->only('store');
    Route::get('types', [\App\Http\Controllers\api\apprenant\AbsenceController::class,'allTypes']);
    Route::get('my-absences', [\App\Http\Controllers\api\apprenant\AbsenceController::class,'index']);
    Route::get('users-for-absence', [\App\Http\Controllers\api\apprenant\AbsenceController::class,'usersForAbsence']);
    Route::post('add-absence', [AbsenceController::class,'store']);
    Route::post('change-status-absence/{absence}', [AbsenceController::class,'changeStatus']);

    Route::apiResource('conge', CongeController::class);
    Route::get('users-for-conge', [CongeController::class,'usersForConge']);
    Route::post('add-conge', [\App\Http\Controllers\api\staff\CongeController::class,'store']);
    Route::get('my-conge', [\App\Http\Controllers\api\staff\CongeController::class,'index']);
    Route::post('change-status-conge/{conge}', [\App\Http\Controllers\api\staff\CongeController::class,'update']);


    Route::get('profile',[ProfileUserController::class, 'index']);
    Route::patch('profile',[ProfileUserController::class, 'update']);
    Route::delete('/logout', [AuthController::class, 'logout']);


});

//Route::apiResource('users', UserController::class);




