<?php

namespace App\Http\Controllers;

use App\Exports\AcCheckExport;
use App\Exports\MotorChecksExport;
use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{

    public function exportUsers()
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }

    public function exportMotorChecks(string $equipment_id)
    {
        return Excel::download(new MotorChecksExport($equipment_id), 'motor-checks.xlsx');
    }

    public function exportAcChecks(string $equipment_id)
    {
        return Excel::download(new AcCheckExport($equipment_id), 'ac-checks.xlsx');
    }
}
