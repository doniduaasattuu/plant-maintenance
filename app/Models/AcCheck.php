<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcCheck extends Model
{
    use HasFactory;

    protected $table = 'ac_checks';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'operational_status_id',
        'leakage',
        'evaporator',
        'condensor',
        'current_before_cleaning',
        'current_after_cleaning',
        'temperature',
        'remote',
        'compressor_pressure',
        'cleaning_filter_indoor',
        'cleaning_indoor',
        'cleaning_outdoor',
        'checked_by',
        'created_at',
        'updated_at',
    ];

    public function checkingForm()
    {
        return $this->morphOne(EquipmentCheckingForm::class, 'formable');
    }
}
