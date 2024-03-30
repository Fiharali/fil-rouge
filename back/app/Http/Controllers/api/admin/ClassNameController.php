<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClassNameRequest;
use App\Models\ClassName;
use Illuminate\Http\Request;

class ClassNameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response([
            'classNames' => ClassName::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassNameRequest $request)
    {
        ClassName::create($request->all());
        return response([
            'success' => 'class  added Successful',
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClassName $className)
    {
        $className->delete();
        return response([
            'success' => 'class  deleted Successful',
        ]);
    }
}
