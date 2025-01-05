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
        'is_operational',
        'is_drain_leaking',
        'current_load',
        'blowing_temperature',
        'ambient_temperature',
        'is_filter_clean',
        'is_evaporator_clean',
        'is_condensor_clean',
        'cleaning_filter',
        'cleaning_evaporator',
        'cleaning_condensor',
        'checked_by',
        'created_at',
        'updated_at',
    ];

    public function checkingForm()
    {
        return $this->morphOne(EquipmentCheckingForm::class, 'formable');
    }
}
