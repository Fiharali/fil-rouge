<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Http\Repositories\LevelRepository;
use App\Http\Requests\StoreLevelResuest;
use App\Models\Level;
use Illuminate\Http\Request;

class LevelController extends Controller
{


    protected $levelRepository;

    public function __construct(LevelRepository $levelRepository)
    {
        $this->levelRepository = $levelRepository;
    }



    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response([
            'levels' => $this->levelRepository->all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLevelResuest $request)
    {
        $this->levelRepository->create($request->all());

        return response([
            'success' => 'level added Successful',
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Level $level)
    {
        $this->levelRepository->delete($level);

        return response([
            'success' => 'level deleted Successful',
        ]);
    }
}
