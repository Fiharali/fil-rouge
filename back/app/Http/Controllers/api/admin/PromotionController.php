<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePromotionResuest;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response([
            'promotions' => Promotion::all(),
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePromotionResuest $request)
    {
        //
         Promotion::create($request->all());
        return response([
            'success' => 'promotion  added Successful',
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Promotion $promotion)
    {
        //
        $promotion->delete();
        return response([
            'success' => 'promotion  deleted Successful',
        ]);
    }
}
